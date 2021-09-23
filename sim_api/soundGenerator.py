import random
import time
SECONDS_IN_A_DAY = 86400

# Quiet room is 30dBA to 50dBA

def sound_generator(input):
    file = open("soundFile.txt","w")

    if(input == "quietRoom"):
        count =0
        for i in range(SECONDS_IN_A_DAY):
            loud_bang = random.randint(1, 101)
            randomLenOfBang = random.randint(2,20)
            # Say a 5% chance of there being a painful noise 
            # and noise has a random generated time to last
            # not safe for any period of time
            if(loud_bang >= (95) or (count >0 and count<randomLenOfBang )):
                line = str(round(random.uniform(120.0, 150.0),1)) + "\n"
                count +=1
            else:
                line = str(round(random.uniform(30.0, 50.0),1)) +"\n"
                count =0
            file.write(line)
            time.sleep(1)
            print(line)
        
sound_generator("quietRoom")