# events/admin.py
from django.contrib import admin
from .models import College, Event, Student, Registration, Attendance, Feedback

admin.site.register(College)
admin.site.register(Event)
admin.site.register(Student)
admin.site.register(Registration)
admin.site.register(Attendance)
admin.site.register(Feedback)
