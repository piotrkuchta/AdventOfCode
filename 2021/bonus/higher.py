import json
import requests
from threading import Thread

known = {}

def do():
    for x in range(100):
        r = requests.get('http://10.106.2.236:8080/init-round?name=:(')
        data = json.loads(r.text)

        while data['right']:
            print(data)
            if not known.get(data['left']):
                with open('filename.txt', 'a') as f:
                    print(data['left'], data['leftCount'], file=f)
                known[data['left']] = data['leftCount']
            if known.get(data['right']):
                # print(known.get(data['right']), data['leftCount'])
                if known.get(data['right']) > data['leftCount']:
                    # print('true')
                    r = requests.get('http://10.106.2.236:8080/next-round?uuid=' + data['uuid'] + '&higher=true')
                else:
                    # print('false')
                    r = requests.get('http://10.106.2.236:8080/next-round?uuid=' + data['uuid'] + '&higher=false')
            else:
                if len(data['right']) < len(data['left']):
                    # print('shot true')
                    r = requests.get('http://10.106.2.236:8080/next-round?uuid=' + data['uuid'] + '&higher=true')
                else:
                    # print('shot false')
                    r = requests.get('http://10.106.2.236:8080/next-round?uuid=' + data['uuid'] + '&higher=false')

            data = json.loads(r.text)

        print(data)
        print('score', data['score'])

if __name__ == "__main__":
    with open('filename.txt', 'r') as f:
        Lines = f.readlines()
        for line in Lines:
            line = line.strip()
            x = line.split()
            if len(x) > 1:
                known[x[0]] = int(x[1])
    # print(known)
    for x in range(8):
        thread = Thread(target = do)
        thread.start()
