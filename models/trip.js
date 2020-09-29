module.exports = function (sequelize, DataTypes) {
    const Trip = sequelize.define("Trip", {
        lat: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        lon: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    })
    return Trip;
};