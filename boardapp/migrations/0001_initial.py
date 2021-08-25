# Generated by Django 3.2.2 on 2021-08-24 08:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BoardModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Board_title', models.CharField(max_length=15)),
                ('Board_img', models.ImageField(null=True, upload_to='Board_img/')),
                ('Board_text', models.TextField(max_length=200)),
                ('Board_Owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Baord_Owner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
