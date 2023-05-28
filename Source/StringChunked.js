
class StringChunked
{
	constructor(chunks)
	{
		this.chunks = chunks;
		this.charsPerChunk = this.chunks[0].length;
	}

	charCodeAt(charIndex)
	{
		var chunkIndex = Math.floor(charIndex / this.charsPerChunk);
		var charOffsetWithinChunk = charIndex % this.charsPerChunk;
		 
		var chunk = this.chunks[chunkIndex];
		var returnValue = chunk.charCodeAt(charOffsetWithinChunk);
		return returnValue;
	}
 
	length()
	{
		var returnValue =  
			((this.chunks.length - 1) * this.charsPerChunk)
			+ this.chunks[this.chunks.length - 1].length;

		return returnValue;
	}
}
