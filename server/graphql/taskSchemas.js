var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLScalar = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLDate = require('graphql-date');
var GraphQLBoolean = require('graphql').GraphQLBoolean;
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
        },
        isComplete:{
          type:GraphQLBoolean
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
            isComplete:{
              type:new GraphQLNonNull(GraphQLBoolean)
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
        },
        updateTask: {
          type: task,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
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
            isComplete:{
              type:new GraphQLNonNull(GraphQLBoolean)
            },
          },
          resolve(root, params) {
            return TaskModel.findByIdAndUpdate(params.id, { Name: params.Name, domain: params.domain, task: params.task, description: params.description, deadline: params.deadline }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeTask: {
          type: task,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remTask = TaskModel.findByIdAndRemove(params.id).exec();
            if (!remTask) {
              throw new Error('Error')
            }
            return remTask;
          }
        },
        completeTask: {
          type: task,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            },
            isComplete:{
              type:new GraphQLNonNull(GraphQLBoolean)
            }
          },
          resolve(root, params) {
            const remTask = TaskModel.findByIdAndUpdate(params.id, {isComplete:true}).exec();
            if (!remTask) {
              throw new Error('Error')
            }
            return remTask;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType,mutation: mutation});