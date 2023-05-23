const AWS = require('aws-sdk');
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'test-table-1'; // Replace with your DynamoDB table name

// Create an item
const createItem = async (item) => {
  const params = {
    TableName: tableName,
    Item: item
  };

  try {
    await docClient.put(params).promise();
    console.log('Item created successfully:', item);
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// Get an item by ID
const getItemById = async (id) => {
  const params = {
    TableName: tableName,
    Key: {
      id: id
    }
  };

  try {
    const result = await docClient.get(params).promise();
    const item = result.Item;
    console.log('Item retrieved:', item);
  } catch (error) {
    console.error('Error getting item:', error);
  }
};
// get all
const getAllItems = async () => {
  const params = {
    TableName: tableName
  };

  try {
    const result = await docClient.scan(params).promise();
    const items = result.Items;
    console.log('All items retrieved:', items);
  } catch (error) {
    console.error('Error getting all items:', error);
  }
};

// Update an item
const updateItem = async (id, updatedAttributes) => {
  const params = {
    TableName: tableName,
    Key: { id: id },
    UpdateExpression: 'SET attribute1 = :val1, attribute2 = :val2',
    ExpressionAttributeValues: {
      ':val1': updatedAttributes.attribute1,
      ':val2': updatedAttributes.attribute2
    }
  };

  try {
    await docClient.update(params).promise();
    console.log('Item updated successfully:', id);
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

// Delete an item by ID
const deleteItem = async (id) => {
  const params = {
    TableName: tableName,
    Key: { id: id }
  };

  try {
    await docClient.delete(params).promise();
    console.log('Item deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

// Usage example
const main = async () => {
  const itemToCreate = {
    id: '1',
    sortKey: Date.now().toString(),
    attribute1: 'Value 1',
    attribute2: 'Value 2'
  };

  await createItem(itemToCreate);
  await getAllItems();

  // await getItemById('1');

  // const updatedAttributes = {
  //   attribute1: 'New Value 1',
  //   attribute2: 'New Value 2'
  // };

  // await updateItem('1', updatedAttributes);

  // await getItemById('1');

  // await deleteItem('1');
};

main();