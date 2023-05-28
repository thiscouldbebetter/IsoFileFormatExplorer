
class IsoFileString
{
	static fromBytes(bytes)
	{
		var returnValue = "";
		for (var i = 0; i < bytes.length; i++)
		{
			var byte = bytes[i];
			returnValue += String.fromCharCode(byte);
		}
		returnValue = returnValue.trim();
		return returnValue;
	}
}
