
class IsoFileDateTimeShort
{
	static fromBytes(bytes)
	{
		var byteStream = new ByteStream(bytes);
		var yearsSince1900 = byteStream.readByte();
		var year = 1900 + yearsSince1900;
		var month = byteStream.readByte();
		var day = byteStream.readByte();
		var hour = byteStream.readByte();
		var minute = byteStream.readByte();
		var second = byteStream.readByte();
		var timeZoneOffset = byteStream.readByte();
		var returnValue = new Date(year, month, day, hour, minute, second); 
		return returnValue;
	}
}
