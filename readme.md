
# Load testing workbench

Projects purpose is to have an environment to simulate differrent kind of setups for distributed highly available system with kubernetes. Setup is a hybrid cloud-on-prem setup and readme is mostly just notes for myself. 
Database is not part of the k8s architecture and is kept separate. 




## Setting up k3s cluster and nodes for hybrid environment


### Master node

`1 Master nodes external ip address`

```
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC=" \
--node-external-ip=*1* \
--flannel-backend=wireguard-native \
--flannel-external-ip \
--tls-san *1* \
--disable traefik \
--disable servicelb" sh -s - 
```


Wireguard-native for vpn mesh, trafeik and servicelb are disabled for in favor of using metallb and nginx (if in need of an ingress).
Nodes external IP needs to be broadcasted aswell as sertificate added for it. Otherwise TLS-handshakes might fail.

**if tls addresses are added afterwards, the certs needs to be refreshed manually**

### Kubeconfig

``` 
/etc/rancher/k3s/k3s.yaml
```


### Metallb loadbalancer

Kubernetes stripped down version, k3s, comes with a local loadbalancer out of the box. It was disabled in favor of using another one, called Metallb.

**install metallb**

```
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.10/config/manifests/metallb-native.yaml
```

**apply IP address pools and L2 advertisement**\
*configure address range specific to your network. Each service attatched to loadbalancer needs an ip. Be sure those addresses are not in use by other devices/services.*

```
kubectl apply -f Kubernetes/addressPool.yaml
```

### Agent node

Master token can be found from 

```
/var/lib/rancher/k3s/server/node-token
```

Node name is a convienence. You get to keep better track of which node is running in which device. 
Each individual node needs to have a unique name. In hybrid setup, you run into a situtation where your nodes running in the same network as master, have the same ip. Either enable automatic suffix for node names or use the --node-name flag and provide one. 

```
curl -sfL https://get.k3s.io | K3S_URL=https://MasterIp:6443
K3S_TOKEN=MasterNodesToken \
INSTALL_K3S_EXEC="--node-external-ip=NodesExternalIp --node-name NodeName" sh -
```

### Deploy servers and loadbalancer service

The node server image is in dockerhub. Keep the image pull policy as 'always' for not relying on cache.
Loadbalancer is tied directly to the node server port and consumes one address from the pool automatically. If you would have more servers and more loadbalancers for them, they each would consume an ip address. 

Its a good practice to specify resource requests, but not limits. This way the k8s kube-scheduler is able to free hands to deploy the pods where ever it sees fit. 


```
kubectl apply -f Kubernetes/simpleNode.yaml
```

Theres an ingress too, dont need it. 
## Monitoring

```
https://k9scli.io/
```


## Client

Client is a python locust client. Very simple use case, one client can get information and add a new record for the database. 
Faker creates a random details for the user to be added and will receive an error for dublicate names. The more the test and environment is run, the more errors will be received from the server as fakers names repeat themselve a lot. 


## database

/testDataGen for creating initial set of fake user data

