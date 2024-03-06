"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../utils/sequelize"));
class AnnouncedPuResult extends sequelize_1.Model {
}
AnnouncedPuResult.init({
    result_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    polling_unit_uniqueid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    party_abbreviation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    party_score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    entered_by_user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    date_entered: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    user_ip_address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.default,
    modelName: 'AnnouncedPuResult'
});
exports.default = AnnouncedPuResult;
