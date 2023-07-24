from locust import task, between, FastHttpUser
from faker import Faker

# locust -f locustfile.py --host=http://127.0.0.1:8000
# locust -f locustfile.py --host=http://172.18.137.250:8000
# locust --host http://172.29.90.7:8080 
# locust --host http://192.168.0.221

fake = Faker()

class QuickstartUser(FastHttpUser):

    # @task
    # def getAPI(self):
    
    #     self.client.get(
    #         url="/info", headers={'Connection':'close'}
    #     )
    @task
    def getAPI(self):
    
        self.client.get(
            url="/me/{}".format(fake.name().replace(" ", "%20"))
        )
    # @task
    # def postApi(self):
    
    #     self.client.post(
    #         url="/register",data={
    #             "name": fake.name(),
    #             'email': fake.email(),
    #             'phone': fake.phone_number(),
    #             'address': fake.address()
    #         })
        
