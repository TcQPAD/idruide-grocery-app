/**
 * Defines the endpoints associated to the grocery-list
 * operations
 */
const endPoint = '/grocery-lists';

let log = require('bole')('grocery-lists/router');
let groceryListModel = require('./grocery-lists-model');
let router = require('express').Router();

/**
 * Gets the grocery-lists from the database and returns them
 * as an array of JSONObject
 *
 * @param {express.Request}   req   Express HTTP request
 * @param {express.Response}  res   Express HTTP response
 */
const getGroceryLists = async (req, res) => {
  log.info('Received GET request for ', endPoint);
  let groceryLists = await groceryListModel.findAll();
  res.json(groceryLists)
};

/**
 * Adds a new grocery list to the database
 */
const addGroceryList = async (req, res) => {
  log.info('Received POST request for ', endPoint);

  if (!req || !req.body || !req.body.groceryList) {
    log.error('Invalid request or missing property groceryList in request');
    res.status(400).send({error: 'Invalid request or missing property groceryList in request'});
  }
  else {
    groceryListModel.addGroceryList(req.body.groceryList);
    log.info('Successfully inserted new GroceryList entry to the database');
    res.status(200).send({success: 'Successfully inserted new GroceryList entry to the database'});
  }
};

/**
 * Finds a grocery list by its id
 * @returns {Promise<void>}
 */
const findGroceryList = async (req, res) => {
  log.info('Received POST request for ', endPoint);

  if (!req || !req.query || !req.query._id) {
    log.error('Invalid request or missing property _id in request');
    res.status(400).send({error: 'Invalid request or missing property _id in request'});
  }
  else {
    let groceryList = await groceryListModel.findById(parseInt(req.query._id, 10));
    console.log(groceryList)
    log.info('Successfully retrieved the grocery list from the database');
    res.status(200).send({success: groceryList});
  }
};

// Endpoint bindings
router.get('/get', getGroceryLists);
router.get('/get-id', findGroceryList);
router.post('/post', addGroceryList);

module.exports = router;