# Server Side Request Forgery
The application shows how a server side request forgery can be performed.

- Hacked - an application which sends request that can be used to attack another service
- Listener - service which logs incoming requests to prove that an unplanned call was made

Both application are created with Node.js & Express, Hacked also contains AngularJS module. In order to build them go into both directories and run npm install. 

# Hacked
A simple website with quot from my favourite philosopher*. Few assumptions were made in order to keep this example extremely simple:

- website has only one button, which downloads image from specified location 
- in a real app this will be a third service which serves graphics, but for us image from Wikipedia is enough
- app could be run with: set DEBUG=Hacked & npm start (Windows, more info: http://expressjs.com/en/starter/generator.html)
- available at: http://localhost:2000/

# Listener
- logs incoming requests when server is called with /hack/was/made url
- logs are stored in file called connections.log
- start with set DEBUG=Listener & npm start
- available at: http://localhost:3000/

More information on blog post: http://itblues.pl/2016/05/21/how-to-defend-against-server-side-request-forgery/

*not! :-)