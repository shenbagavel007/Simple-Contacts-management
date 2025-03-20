
from django.urls import path
from . import views

urlpatterns = [
    path('contacts/', views.get_contacts, name='get_contacts'),  # GET request for retrieving contacts
    path('contacts/create/', views.add_contact, name='add_contact'),  # POST request for adding contact
    path('contacts/<int:pk>/', views.delete_contact, name='delete_contact'),  # DELETE request for deleting a contact
]
