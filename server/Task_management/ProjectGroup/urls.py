from django.urls import path
from .views import (
    ProjectListView,
    ProjectMembershipView,
    MemberListView
)

urlpatterns = [
    path('project/', ProjectListView.as_view(), name='Project'),
    path('projectmember/', ProjectMembershipView.as_view(), name='ProjectMember'),
    path('projectmemberlist/<int:project_id>',
         MemberListView.as_view(), name='ProjectMemberList')
]
