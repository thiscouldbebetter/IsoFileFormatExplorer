
class IsoFileVolumeDescriptor_Primary
{
	constructor
	(
		systemID,
		volumeID,
		volumeSpaceSize,
		volumeSetSize,
		volumeSequenceNumber,
		logicalBlockSize,
		pathTableSize,
		locationOfPathTable,
		locationOfOptionalPathTable,
		directoryEntryRoot,
		volumeSetID,
		publisherID,
		dataPreparerID,
		applicationID,
		copyrightFileID,
		abstractFileID,
		bibliographicFileID,
		volumeCreateTime,
		volumeModifyTime,
		volumeExpireTime,
		volumeEffectiveTime,
		fileStructureVersion,
		applicationUsed
	)
	{
		this.type = IsoFileVolumeDescriptorType.Instances().Primary;
	 
		this.systemID = systemID;
		this.volumeID = volumeID;
		this.volumeSpaceSize = volumeSpaceSize;
		this.volumeSetSize = volumeSetSize;
		this.volumeSequenceNumber = volumeSequenceNumber;
		this.logicalBlockSize = logicalBlockSize;
		this.pathTableSize = pathTableSize;
		this.locationOfPathTable = locationOfPathTable;
		this.locationOfOptionalPathTable = locationOfOptionalPathTable;
		this.directoryEntryRoot = directoryEntryRoot;
		this.volumeSetID = volumeSetID;
		this.publisherID = publisherID;
		this.dataPreparerID = dataPreparerID;
		this.applicationID = applicationID;
		this.copyrightFileID = copyrightFileID;
		this.abstractFileID = abstractFileID;
		this.bibliographicFileID = bibliographicFileID;
		this.volumeCreateTime = volumeCreateTime;
		this.volumeModifyTime = volumeModifyTime;
		this.volumeExpireTime = volumeExpireTime;
		this.volumeEffectiveTime = volumeEffectiveTime;
		this.fileStructureVersion = fileStructureVersion;
		this.applicationUsed = applicationUsed;
	}

	static fromByteStream(byteStream)
	{
		var unused = byteStream.readByte();
		var systemID = IsoFileString.fromBytes(byteStream.readBytes(32));
		var volumeID = IsoFileString.fromBytes(byteStream.readBytes(32));
		var unused2 = byteStream.readBytes(8);
		var volumeSpaceSizeLE = byteStream.readInt32LE();
		var volumeSpaceSizeBE = byteStream.readInt32BE();	   
		var unused3 = byteStream.readBytes(32);
		var volumeSetSizeLE = byteStream.readInt16LE();
		var volumeSetSizeBE = byteStream.readInt16BE();
		var volumeSequenceNumberLE = byteStream.readInt16LE();
		var volumeSequenceNumberBE = byteStream.readInt16BE();
		var logicalBlockSizeLE = byteStream.readInt16LE();
		var logicalBlockSizeBE = byteStream.readInt16BE();
		var pathTableSizeLE = byteStream.readInt32LE();
		var pathTableSizeBE = byteStream.readInt32BE();	 
		var locationOfPathTableLE = byteStream.readInt32LE(); // "LE" = "Little-Endian".
		var locationOfOptionalPathTableLE = byteStream.readInt32LE();
		var locationOfPathTableBE = byteStream.readInt32BE(); // "BE" = "Big-Endian".
		var locationOfOptionalPathTableBE = byteStream.readInt32LE();
		var directoryEntryRoot = IsoFileDirectoryEntry.fromBytes(byteStream.readBytes(34));
		var volumeSetID = IsoFileString.fromBytes(byteStream.readBytes(128));
		var publisherID = IsoFileString.fromBytes(byteStream.readBytes(128));
		var dataPreparerID = IsoFileString.fromBytes(byteStream.readBytes(128));
		var applicationID = IsoFileString.fromBytes(byteStream.readBytes(128));
		var copyrightFileID = IsoFileString.fromBytes(byteStream.readBytes(38));
		var abstractFileID = IsoFileString.fromBytes(byteStream.readBytes(36));
		var bibliographicFileID = IsoFileString.fromBytes(byteStream.readBytes(37));
		var volumeCreateTime = IsoFileDateTimeLong.fromBytes(byteStream.readBytes(17));
		var volumeModifyTime = IsoFileDateTimeLong.fromBytes(byteStream.readBytes(17));
		var volumeExpireTime = IsoFileDateTimeLong.fromBytes(byteStream.readBytes(17));
		var volumeEffectiveTime = IsoFileDateTimeLong.fromBytes(byteStream.readBytes(17));
		var fileStructureVersion = byteStream.readByte();
		var unused4 = byteStream.readByte();
		var applicationUsed = IsoFileString.fromBytes(byteStream.readBytes(512));
		var reserved = byteStream.readBytes(653);
		 
		var returnValue = new IsoFileVolumeDescriptor_Primary
		(
			systemID,
			volumeID,
			volumeSpaceSizeLE,
			volumeSetSizeLE,
			volumeSequenceNumberLE,
			logicalBlockSizeLE,
			pathTableSizeLE,
			locationOfPathTableLE,
			locationOfOptionalPathTableLE,
			directoryEntryRoot,
			volumeSetID,
			publisherID,
			dataPreparerID,
			applicationID,
			copyrightFileID,
			abstractFileID,
			bibliographicFileID,
			volumeCreateTime,
			volumeModifyTime,
			volumeExpireTime,
			volumeEffectiveTime,
			fileStructureVersion,
			applicationUsed
		);

		return returnValue;
	}
}
