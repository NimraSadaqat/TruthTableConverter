# Generated by Django 3.0.3 on 2021-08-05 05:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Boolean_Expression',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('expression', models.CharField(max_length=1000)),
                ('image', models.ImageField(null=True, upload_to='BE_converter')),
                ('created_date_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
