from django.urls import path
from .views import (
    TaskListView,
    TaskDetailedView
)

urlpatterns = [
    path('task/', TaskListView.as_view(), name='Task'),
    path('task/<int:task_id>', TaskDetailedView.as_view(), name='Task/id')

]
