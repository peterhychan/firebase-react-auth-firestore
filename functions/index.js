const functions = require("firebase-functions");
const admin = require("firebase-admin");

const LINKS_PER_PAGE = 5;
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://peter-firebase-react-tutorial.firebaseio.com"
});
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.linksPagination = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let linksRef = db.collection("links");
  const offset = Number(request.query.offset);
  linksRef
    .orderBy("created", "desc")
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .then(snapshot => {
      const links = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data };
      });
      response.json(links);
    });
});
