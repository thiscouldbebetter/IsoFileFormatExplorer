
class IsoFileDateTimeLong
{
	static fromBytes(bytes)
	{
		var year = parseInt(IsoFileString.fromBytes(bytes.slice(0, 4)));
		var month = parseInt(IsoFileString.fromBytes(bytes.slice(4, 6)));
		var day = parseInt(IsoFileString.fromBytes(bytes.slice(6, 8)));
		var hour = parseInt(IsoFileString.fromBytes(bytes.slice(8, 10)));
		var minute = parseInt(IsoFileString.fromBytes(bytes.slice(10, 12)));
		var second = parseInt(IsoFileString.fromBytes(bytes.slice(12, 14)));
		var centisecond = parseInt(IsoFileString.fromBytes(bytes.slice(14, 16)));
		var timeZoneOffset = bytes[16];
		var returnValue = new Date(year, month, day, hour, minute, second); 
		return returnValue;
	}
}
