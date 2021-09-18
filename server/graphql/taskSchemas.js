var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLScalar = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt=require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var TaskModel = require('../models/Task');
var TeamModel = require('../models/Team');
var MemberModel = require('../models/member');


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
          type: GraphQLDate
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

  var members=new GraphQLObjectType({
    name:'members',
    fields: function(){
      return{
        Mname: {
          type: GraphQLString
        },
      }
    }
  });

  var membersInput=new GraphQLInputObjectType({
    name:'membersInput',
    fields: function(){
      return{
        Mname: {
          type: GraphQLString
        },
      }
    }
  });

  var team = new GraphQLObjectType({
    name: 'team',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        Name: {
          type: GraphQLString
        },
        members: {
          type: GraphQLInt
        },
        member:{
          type: new GraphQLList(members)
        },
        project:{
          type:GraphQLString
        },
        description: {
          type: GraphQLString
        },
      }
    }
  });

  /*var member=new GraphQLObjectType({
    name:'member',
    fields: function(){
      return{
        teamid:{
          type:GraphQLString
        },
        _id:{
          type:GraphQLString
        },
        Name: {
          type: GraphQLString
        },
      }
    }
  });*/


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
        teams: {
          type: new GraphQLList(team),
          resolve: function () {
            const teams = TeamModel.find().exec()
            if (!teams) {
              throw new Error('Error')
            }
            return teams
          }
        },
        members1: {
          type: new GraphQLList(members),
          resolve: function () {
            const members1 = MemberModel.find().exec()
            if (!members1) {
              throw new Error('Error')
            }
            return members1
          }
        },
        members: {
          type: members,
          args: {
            teamId: {
              name: 'teamid',
              type: GraphQLString
            }
          },
          resolve: function () {
            const members = MemberModel.find({where:{teamid:teamId}}).exec()
            if (!members) {
              throw new Error('Error')
            }
            return members
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
              type: new GraphQLNonNull(GraphQLDate)
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
              type: new GraphQLNonNull(GraphQLDate)
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
        },
        addTeam: {
          type: team,
          args: {
            Name: {
              type: new GraphQLNonNull(GraphQLString)
            },
            members: {
              type: new GraphQLNonNull(GraphQLInt)
            },
            member:{type:new GraphQLList(membersInput)},
            project:{
              type:new GraphQLNonNull(GraphQLString)
            },
            description: {
              type: new GraphQLNonNull(GraphQLString)
            },
          },
          resolve: function (root, params) {
            const teamModel = new TeamModel(params);
            const newTeam = teamModel.save();
            if (!newTeam) {
              throw new Error('Error');
            }
            return newTeam
          }
        },
        addMember: {
          type: team,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            Mname: {
              type: new GraphQLNonNull(GraphQLString)
            },
          },
          resolve: function (root, params) {
            const memberModel= TeamModel.findByIdAndUpdate(params.id, { $push:{member:{Mname:params.Mname}}},).exec();
            
            if (!memberModel) {
              throw new Error('Error');
            }
            return memberModel
          },
        },
        removeTeam: {
          type: team,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remTeam = TeamModel.findByIdAndRemove(params.id).exec();
            if (!remTeam) {
              throw new Error('Error')
            }
            return remTeam;
          }
        },

      }
    }
  });
 
  module.exports = new GraphQLSchema({query: queryType,mutation: mutation});