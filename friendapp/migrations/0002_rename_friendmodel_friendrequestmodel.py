# Generated by Django 3.2.2 on 2021-09-06 14:28

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friendapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FriendModel',
            new_name='FriendRequestModel',
        ),
    ]
