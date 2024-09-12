import os
from django.core.management import call_command

admin_port = os.getenv('ADMIN_PORT', '8001')
     
if __name__ == "__main__":
    print(f"Starting Django server for admin on port {admin_port}")
    call_command('runserver', f"0.0.0.0:{admin_port}")
     
