# events/models.py
from django.db import models

class College(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Event(models.Model):
    EVENT_TYPES = [
        ('workshop', 'Workshop'),
        ('hackathon', 'Hackathon'),
        ('seminar', 'Seminar'),
        ('fest', 'Fest'),
        ('other', 'Other'),
    ]
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='other')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    capacity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.college})"

class Student(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='students')
    student_id = models.CharField(max_length=100)  # college-specific id (roll no)
    name = models.CharField(max_length=200)
    email = models.EmailField()

    class Meta:
        unique_together = ('college', 'student_id')

    def __str__(self):
        return f"{self.name} ({self.student_id})"

class Registration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='registrations')
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('event', 'student')

    def __str__(self):
        return f"{self.student} -> {self.event}"

class Attendance(models.Model):
    registration = models.OneToOneField(Registration, on_delete=models.CASCADE, related_name='attendance')
    checked_in_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attendance: {self.registration}"

class Feedback(models.Model):
    registration = models.OneToOneField(Registration, on_delete=models.CASCADE, related_name='feedback')
    rating = models.IntegerField()  # 1-5
    comment = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback {self.rating} for {self.registration}"
