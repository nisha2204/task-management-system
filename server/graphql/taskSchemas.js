var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLDate = require('graphql-date');
var TaskModel = require('../models/Task');

var task = new GraphQLObjectType({
    name: 'task',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        Name: {
          type: GraphQLString
        },
        domain: {
          type: GraphQLString
        },
        task: {
          type: GraphQLString
        },
        description: {
          type: GraphQLString
        },
        deadline: {
          type: GraphQLString
        }
        //updated_date: {
          //type: GraphQLDate
        //}
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        tasks: {
          type: new GraphQLList(task),
          resolve: function () {
            const tasks = TaskModel.find().exec()
            if (!tasks) {
              throw new Error('Error')
            }
            return tasks
          }
        },
        task: {
          type: task,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const taskDetails = TaskModel.findById(params.id).exec()
            if (!taskDetails) {
              throw new Error('Error')
            }
            return taskDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addTask: {
          type: task,
          args: {
            Name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            domain: {
              type: new GraphQLNonNull(GraphQLString)
            },
            task: {
              type: new GraphQLNonNull(GraphQLString)
            },
            description: {
              type: new GraphQLNonNull(GraphQLString)
            },
            deadline: {
              type: new GraphQLNonNull(GraphQLString)
            },
          },
          resolve: function (root, params) {
            const taskModel = new TaskModel(params);
            const newTask = taskModel.save();
            if (!newTask) {
              throw new Error('Error');
            }
            return newTask
          }
        }
      }

    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});