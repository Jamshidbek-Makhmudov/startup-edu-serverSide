import { createLogger, format, transports } from "winston";
const { printf, combine, timestamp, prettyPrint, json, colorize } = format;
const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});

export const testLogger = createLogger({
	// format:combine(colorize(), timestamp(), myFormat), //bu birnchi yoli rangli qilib chiqarib beradi
	format: combine(timestamp(), myFormat, prettyPrint()), // bu ikkinchi yoli json korinishida chiqat=rib beradi
	transports: [
		new transports.Console(),
		new transports.File({ filename: "logs/test.log", level: "debug" }) //bu qayerga yozib qoyishimizni korsatadi dbga ham yozsa boladi
	]
});

//pasdagilar ushlab bolmaydigan errorlarni ham ushlab beradi
testLogger.exceptions.handle(new transports.File({ filename: "logs/exceptions.log" }));
testLogger.rejections.handle(new transports.File({ filename: "logs/rejections.log" }));
testLogger.exitOnError = false;
// testLogger.exitOnError=true