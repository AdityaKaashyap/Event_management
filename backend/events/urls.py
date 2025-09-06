# events/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (CollegeViewSet, EventViewSet, StudentViewSet,
                    RegistrationViewSet, AttendanceViewSet, FeedbackViewSet,
                    registrations_per_event, attendance_percentage,
                    average_feedback, top_active_students)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register('colleges', CollegeViewSet)
router.register('events', EventViewSet)
router.register('students', StudentViewSet)
router.register('registrations', RegistrationViewSet)
router.register('attendances', AttendanceViewSet)
router.register('feedbacks', FeedbackViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('reports/registrations_per_event/', registrations_per_event),
    path('reports/attendance_percentage/', attendance_percentage),
    path('reports/average_feedback/', average_feedback),
    path('reports/top_active_students/', top_active_students),
]
