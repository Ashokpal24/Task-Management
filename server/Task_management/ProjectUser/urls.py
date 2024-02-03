from django.urls import path
from .views import (
    ProjectMembershipView,
    MemberListView
)
urlpatterns = [
    path('projectmember/', ProjectMembershipView.as_view(), name='ProjectMember'),
    path('projectmemberlist/<int:project_id>',
         MemberListView.as_view(), name='ProjectMemberList')
]
