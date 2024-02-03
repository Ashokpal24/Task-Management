from django.urls import path
from .views import (
    ProjectListView,
    ProjectDetailedView
)

urlpatterns = [
    path('project/', ProjectListView.as_view(), name='Project'),
    path('project/<int:project_id>',
         ProjectDetailedView.as_view(), name='Project Detailed'),
]
