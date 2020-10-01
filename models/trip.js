module.exports = function (sequelize, DataTypes) {
    const Trip = sequelize.define("Trip", {
        lat: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
        lon: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING(80),
            allowNull: false
        }
    })
    return Trip;
};