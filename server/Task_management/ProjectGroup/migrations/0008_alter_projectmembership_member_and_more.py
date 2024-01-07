# Generated by Django 5.0.1 on 2024-01-07 13:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ProjectGroup", "0007_alter_projectmembership_member_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectmembership",
            name="member",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="membership_list",
                to=settings.AUTH_USER_MODEL,
                verbose_name="User ID",
            ),
        ),
        migrations.AlterField(
            model_name="projectmembership",
            name="project",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="membership_list",
                to="ProjectGroup.projectgroup",
                verbose_name="Project",
            ),
        ),
    ]
