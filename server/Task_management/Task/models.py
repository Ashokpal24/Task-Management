from django.db import models
from User.models import User
from ProjectGroup.models import ProjectGroup


class Task(models.Model):
    title = models.CharField(
        verbose_name="Title",
        max_length=255,
        blank=False)

    percentage = models.FloatField(verbose_name="Percentage", default=0.0)

    status = models.TextField(verbose_name="status", default="New", null=False)

    project_id = models.ForeignKey(
        ProjectGroup,
        on_delete=models.CASCADE,
        verbose_name="Project ID",
        related_name='task_list'
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="User ID",
        null=True)

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True)

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True)

    def __str__(self):
        return f"Title: {self.title}\n Percentage: {self.percentage}\n Done: {self.status} \n Created by:{self.created_by}"
