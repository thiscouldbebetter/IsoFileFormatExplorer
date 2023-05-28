
class FileReaderLarge
{
	// Is this class actually being used?

	constructor()
	{
		this.systemFileReader = new FileReader();
		this.bytesPerChunk = 2 * 1024 * 1024; // 2 MiB.
	}

	readFileAsBinaryStrings(fileToRead, callback) 
	{
		this.numberOfChunks = Math.ceil(fileToRead.size / this.bytesPerChunk);
		this.fileChunksAsBinaryStrings = [];
		this.readFileAsBinaryStrings_Chunk(fileToRead, 0, callback);
	}

	readFileAsBinaryStrings_Chunk(file, chunkIndex, callback)
	{
		if (chunkIndex >= this.numberOfChunks)
		{
			callback(this.fileChunksAsBinaryStrings);
		}
		else
		{
			var chunkOffsetInBytes = this.bytesPerChunk * chunkIndex;
			var chunkEndInBytes = chunkOffsetInBytes + this.bytesPerChunk;
			var fileChunk = file.slice(chunkOffsetInBytes, chunkEndInBytes);
			var thisAsVariable = this;
			this.systemFileReader.onload = (event) =>
			{
				var fileChunkAsBinaryString = event.target.result;
				thisAsVariable.fileChunksAsBinaryStrings[chunkIndex] =
					fileChunkAsBinaryString;

				thisAsVariable.readFileAsBinaryStrings_Chunk
				(
					file, chunkIndex + 1, callback
				);
			}
			this.systemFileReader.readAsBinaryString(fileChunk);
		}
	}
}
