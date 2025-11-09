const Guild = require("./models/guild")
const infraction = require("./models/infraction")
//Guild.sync({alter:true})
infraction.sync({force:true})