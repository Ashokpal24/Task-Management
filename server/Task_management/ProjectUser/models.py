from django.db import models
from User.models import User
from ProjectGroup.models import ProjectGroup
# Create your models here.


class ProjectMembership(models.Model):
    project = models.ForeignKey(
        ProjectGroup,
        on_delete=models.CASCADE,
        verbose_name="Project",
        null=True,
        related_name="membership_list"
    )

    member = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="User ID",
        null=True,
        related_name="membership_list"
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True)

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True)

    def __str__(self):
        return f"User : {self.member}\n  project:{self.project}"
