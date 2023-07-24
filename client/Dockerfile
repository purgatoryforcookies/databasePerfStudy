FROM python:3.8
WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY ./locustfile.py ./locustfile.py

CMD ["locust", "--worker", "--master-host=84.249.42.208"]