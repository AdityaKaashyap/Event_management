# events/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.db.models import Count, Avg
from .models import College, Event, Student, Registration, Attendance, Feedback
from .serializers import (CollegeSerializer, EventSerializer, StudentSerializer,
                          RegistrationSerializer, AttendanceSerializer, FeedbackSerializer)
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-start_time')
    serializer_class = EventSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def create(self, request, *args, **kwargs):
        # create or reject duplicate registration (unique_together on model will enforce)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

# Reports
@api_view(['GET'])
def registrations_per_event(request):
    """
    Returns total registrations per event.
    """
    qs = Event.objects.annotate(total_reg=Count('registrations')).order_by('-total_reg')
    data = [{"event_id": e.id, "title": e.title, "total_registrations": e.total_reg} for e in qs]
    return Response(data)

@api_view(['GET'])
def attendance_percentage(request):
    """
    Returns attendance percentage for each event.
    """
    events = Event.objects.all()
    result = []
    for e in events:
        total = e.registrations.count()
        attended = Attendance.objects.filter(registration__event=e).count()
        pct = (attended / total * 100) if total > 0 else 0.0
        result.append({
            "event_id": e.id,
            "title": e.title,
            "total_registrations": total,
            "attended": attended,
            "attendance_percentage": round(pct, 2)
        })
    return Response(result)

@api_view(['GET'])
def average_feedback(request):
    """
    Average feedback per event.
    """
    qs = Event.objects.annotate(avg_rating=Avg('registrations__feedback__rating')).order_by('-avg_rating')
    data = [{"event_id": e.id, "title": e.title, "average_rating": e.avg_rating or 0.0} for e in qs]
    return Response(data)

@api_view(['GET'])
def top_active_students(request):
    """
    Top 3 most active students by attendance count.
    """
    from django.db.models import Count
    students = Student.objects.annotate(attended_count=Count('registrations__attendance')).order_by('-attended_count')[:3]
    data = [{"student_id": s.student_id, "name": s.name, "attended": s.attended_count} for s in students]
    return Response(data)
