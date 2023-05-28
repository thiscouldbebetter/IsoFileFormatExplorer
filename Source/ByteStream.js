
class ByteStream
{
	constructor(bytes)
	{
		this.bytes = bytes;
		this.byteIndexCurrent = 0;
	}

	peekByte()
	{
		return this.bytes[this.byteIndex];
	}
 
	readByte()
	{
		var returnValue = this.bytes[this.byteIndexCurrent];
		this.byteIndexCurrent++;
		return returnValue;
	}
 
	readBytes(numberOfBytes)
	{
		var bytesRead = [];
		for (var i = 0; i < numberOfBytes; i++)
		{
			var byteRead = this.readByte();
			bytesRead.push(byteRead);
		}
		return bytesRead;
	}
	 
	readInt16BE()
	{
		var bytes = this.readBytes(2);
		var returnValue = 
			bytes[0] << 8
			| bytes[1];
		return returnValue;
	}
	 
	readInt16LE()
	{
		var bytes = this.readBytes(2);
		var returnValue = 
			bytes[0] 
			| bytes[1] << 8;
		return returnValue;
	}
 
	readInt32BE()
	{
		var bytes = this.readBytes(4);
		var returnValue = 
			bytes[0] << 24
			| bytes[1] << 16
			| bytes[2] << 8
			| bytes[3];
		return returnValue;
	}
	 
	readInt32LE()
	{
		var bytes = this.readBytes(4);
		var returnValue = 
			bytes[0] 
			| bytes[1] << 8
			| bytes[2] << 16
			| bytes[3] << 24;
		return returnValue;
	}   
	 
	seek(byteIndex)
	{
		this.byteIndexCurrent = byteIndex;
	}
}
