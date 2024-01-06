from django.db import models
from User.models import User


class ProjectGroup(models.Model):
    title = models.CharField(
        verbose_name="Title",
        max_length=255,
        blank=False)

    description = models.CharField(
        verbose_name="Description",
        max_length=255,
        blank=False)

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        verbose_name="User ID",
        null=True)

    created_at = models.DateTimeField(
        verbose_name="Created At",
        auto_now_add=True)

    updated_at = models.DateTimeField(
        verbose_name="Updated At",
        auto_now=True)

    def __str__(self):
        return f"Title: {self.title}\n  Created by:{self.created_by}"
