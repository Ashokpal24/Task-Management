from django.urls import path
from .views import (
    ProjectListView,
    ProjectDetailedView,
    ProjectMembershipView,
    MemberListView
)

urlpatterns = [
    path('project/', ProjectListView.as_view(), name='Project'),
    path('project/<int:project_id>', ProjectDetailedView.as_view(), name='Project Detailed'),
    path('projectmember/', ProjectMembershipView.as_view(), name='ProjectMember'),
    path('projectmemberlist/<int:project_id>',
         MemberListView.as_view(), name='ProjectMemberList')
]
