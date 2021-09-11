import uuid
from cassandra.cqlengine import columns
from django_cassandra_engine.models import DjangoCassandraModel
from cassandra.cqlengine import models

# Create your models here.


class Pharmacy(models.Model):
    id = columns.Text(primary_key=True)
    pharmacy_json = columns.Map(key_type=columns.Text, value_type=columns.Text)


class Cart(models.Model):
    username = columns.Text(primary_key=True)
    cart_json = columns.Map(key_type=columns.Text, value_type=columns.Text)
