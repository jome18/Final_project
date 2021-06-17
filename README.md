The use case of AllergoBuster5000:
Install Django Framework for Python!

- the user does not know, if he is allergic to any kind of grass or tree pollen;
- the app allows him to daily monitor pollen flight and evaluate each day and pollen count by personal feeling;
- a bar chart relates the average pollen count to the personal feeling; it allows the user personal analysis and to bust his allergies;
- login data for sample user is: username "a", password "a";


Data:

- free data is provided by the "Elektronisches Pollennetzwerk, Bayrisches Landesamt für Gesundheit und Lebensmittelsicherheit" via REST API -> overview on https://epin.lgl.bayern.de/schnittstelle;
- data is limited to certain locations, mainly in southern Germany -> https://epin.lgl.bayern.de/api/locations;
- data is provided for hypothetical 41 different pollen, depending on what is flying, provided with botanical nomination -> https://epin.lgl.bayern.de/api/pollen
- data is provided each day in 3 hour intervals beginning on 00:00 hrs, ending on 06:00 p.m. -> https://epin.lgl.bayern.de/api/measurements
- not each location is active every day or at each interval;


PLEASE NOTE: You need to unblock the Access-Control-Allow-Origin feature of your browser; any extension will do e.g.:
	- CORS Unblock
	- Allow CORS: Access-Control-Allow-Origin


In Detail:

The app has 2 states:
I. logged out (user not authenticated)
II. logged in (user is authenticated)

The app consists off 4 html files:
1. layout, which contains the metadata and navigation bar;
2. index with the containers for data display and graphs which is handeld in javascript;
3. the login page;
4. the register page;

ad 1.:
The layout provides the necessary metadata (especially the styles from Bootstrap 5.0.0), a navbar and the body block, where all other html files will be embedded. The nav bar shows in
	- state I the links "AllergoBuster5000", which leads to the index.html; a "Log In" and "Register", which lead to the regarding html pages with expectable functionality; a succesful log in changes the site in state II;
	- in state II these links are replaced by "Log Out", which changes to state I, and "Meine Pollen", which actives Javascript for graphical display;

ad 2.: 
The index.html provides all distinctive features and is like 3. and 4. embedded in layout.html. Index is loaded on visiting the page and on any refresh made except on 3. and 4.; the index.html includes 3 Javascript files (ab5tServices, ab5tgetWebData, ab5tgetModelData) and 1 generic graphic library, plotly; furthermore the body contains in
	- state I: 2 containers for bootstrap component "cards";
	- state II: in addition 1 container for graphical display and 1 form group (select) with button;
The logic of index in state I (logged out) is:
	-on load, the user should get an overview on what is flying where; so the javascript logic fetches all available locations from data source and generates a card for it; for each card there is fetch for all avialable 41 pollen and intervals for the current day; it is summed up and the top three are displayed;
- a click on any specific location card in the overview will let vanish all location cards; instead the measurements for each pollen and interval will be displayed in a single card, including the sum; if the measurement of all intervals is 0, the specific pollen will not be displayed, so you will seldom see 41 cards; this provides you with a specific and detailed insight in the specific location; a refresh always takes you pack to index respectively the overview;

The logic of index in state II (logged in) is:
	- all of state I
	- on the specific location site appers the form group with button; you now have the option to select your recent feeling out of 3 categories: normal, bad, good; on submit the selection + the pollen flight data of the specific location is saved to the data base; the idea is, that you have one save per day, meaning you can saev mnultiple times, but you will only have 1 dataset per day, which can be updated only on that specific day; why is that? The idea is to correlate the feeling with the average pollen flight per day; if you have multiple datasets per day, this will distort the data; in fact, it makes most sense to save the data late the day, so you cover as many intervals per day as possible; this is not super precise data science, but its for your personal use anyway and helps the more deliberate rough estimate;
	- the link "My Pollen" fetches data from the model, which is all datasets related to the user; they are sorted by the "feeling" categories, the average for each pollen is calculated and everything is displayed on the index.html in a bar chart graphic; all 3 categories are displayed in one chart; so you can quickly check where the differences are biggest - the example user seems to have a problem with ash tree and common hornbeam;


The 3 mentioned Javascript files ( a: ab5tServices, b: ab5tgetWebData, c: ab5tgetModelData) contain a) translation logic, graphical display logic and saving data to the model; b) the fetch / api to the external datasource from ePin and dynamical display on the index page; c) the logic for fetching data from the model, and presenting it in a a graph; the view.py mainly processes the data for the model and view, by calculating the averages.


All botanical pollen names are provided in Latin; for display they are translated to english - but on hover they are re-translated to Latin, so you have the precise nomination. 

May the use case and functionality appear simple, the implementation of the fetch logic and distribution to the cards was quite complex, as well as the data transfer from / to the model; I hope this will be sufficient as capstone project - please keep in mind to unblock CORS in your browser.

Have fun :)
