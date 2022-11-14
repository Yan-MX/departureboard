# Departure Board Jernbanetorget

This project is a departure board that give real-time information about buses at Jernbanetorget.
![](https://media.giphy.com/media/qPNJgrujR7GVpURpfn/giphy.gif)

###### We send the query to the API to retrieve data every second. 
###### Each API call takes 5 seconds (we mock this by set 5 seconds timeout before make the call)
###### Before the first API call receives its response, other new queries will be stored in a queue
###### We check every second, if the previous call has received its response. If so, we send the last query in the queue and clear the queue. Otherwise, we add the new query in the queue

## Available Scripts

In the project directory, you can run:

### `git clone https://github.com/Yan-MX/departureboard.git`
to clone the project 

### `npm install`
to install the dependency

### `npm start`
to run the project locally

