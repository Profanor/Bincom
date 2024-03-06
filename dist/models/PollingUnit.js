"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../utils/sequelize"));
class PollingUnit extends sequelize_1.Model {
}
PollingUnit.init({
    uniqueid: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    polling_unit_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ward_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    lga_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    uniquewardid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    polling_unit_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    polling_unit_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    polling_unit_description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    long: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
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
    modelName: 'PollingUnit'
});
exports.default = PollingUnit;
