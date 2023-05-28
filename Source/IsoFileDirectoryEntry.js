
class IsoFileDirectoryEntry
{
	constructor
	(
		entryLengthInBytes,
		extendedAttributeRecordLength,
		dataLocationInSectors,
		dataLengthInBytes,
		recordingTime,
		flags,
		interleaveUnitSize,
		interleaveGapSize,
		volumeSequenceNumber,
		fileName
	)
	{
		this.entryLengthInBytes = entryLengthInBytes;
		this.extendedAttributeRecordLength = extendedAttributeRecordLength;
		this.dataLocationInSectors = dataLocationInSectors;
		this.dataLengthInBytes = dataLengthInBytes;
		this.recordingTime = recordingTime;
		this.flags = flags;
		this.interleaveUnitSize = interleaveUnitSize;
		this.interleaveGapSize = interleaveGapSize;
		this.volumeSequenceNumber = volumeSequenceNumber;
		this.fileName = fileName;
	}

	static fromBytes(bytes)
	{
		var byteStream = new ByteStream(bytes);
		 
		var entryLengthInBytes = byteStream.readByte();
		var extendedAttributeRecordLength = byteStream.readByte();
		var dataLocationInSectorsLE = byteStream.readInt32LE();
		var dataLocationInSectorsBE = byteStream.readInt32BE();
		var dataLengthInBytesLE = byteStream.readInt32LE();
		var dataLengthInBytesBE = byteStream.readInt32BE();
		var recordingTime = IsoFileDateTimeShort.fromBytes(byteStream.readBytes(7));
		var flags = byteStream.readByte();
		var interleaveUnitSize = byteStream.readByte();
		var interleaveGapSize = byteStream.readByte();
		var volumeSequenceNumberLE = byteStream.readInt16LE();
		var volumeSequenceNumberBE = byteStream.readInt16BE();
		var fileNameLength = byteStream.readByte();
		var fileName = IsoFileString.fromBytes(byteStream.readBytes(fileNameLength));
		if (fileNameLength % 2 == 0)
		{
			var padding = byteStream.readByte();
		}
		//var reserved = byteStream.readToEnd();
		 
		var returnValue = new IsoFileDirectoryEntry
		(
			entryLengthInBytes,
			extendedAttributeRecordLength,
			dataLocationInSectorsLE,
			dataLengthInBytesLE,
			recordingTime,
			flags,
			interleaveUnitSize,
			interleaveGapSize,
			volumeSequenceNumberLE,
			fileName
		);
		 
		return returnValue;
	}

	// Instance methods.

	clone()
	{
		return new IsoFileDirectoryEntry
		(
			this.entryLengthInBytes,
			this.extendedAttributeRecordLength,
			this.dataLocationInSectors,
			this.dataLengthInBytes,
			this.recordingTime,
			this.flags,
			this.interleaveUnitSize,
			this.interleaveGapSize,
			this.volumeSequenceNumber,
			this.fileName
		);
	}

	directoryContentsBuild(fileAsByteStream)
	{
		if (this.flags.isDirectory == false)
		{
			return;
		}

		var dataOffsetInBytes = 
			this.dataLocationInSectors 
			* this.dataLengthInBytes;
		fileAsByteStream.seek(dataOffsetInBytes);

		var childEntries = [];

		while (true)
		{
			var entryLengthAsBytes = fileAsByteStream.peekByte();
			if (entryLengthAsBytes == 0)
			{
				break;
			}
			else
			{
				var entryAsBytes = 
					fileAsByteStream.readBytes(entryLengthAsBytes);
				var entry = 
					IsoFileDirectoryEntry.fromBytes(entryAsBytes);  
				childEntries.push(entry);
			}
		}
		 
		this.childEntries = childEntries;
		for (var i = 0; i < this.childEntries.length; i++)
		{
			var child = this.childEntries[i];
			// todo - Leads to stack overflow right now.
			//child.directoryContentsBuild(fileAsByteStream);
		}
	}
}
