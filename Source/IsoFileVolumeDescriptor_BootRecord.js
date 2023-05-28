
class IsoFileVolumeDescriptor_BootRecord
{
	constructor(bootSystemID, bootID, data)
	{
		this.type = IsoFileVolumeDescriptorType.Instances().BootRecord;
	 
		this.bootSystemID = bootSystemID;
		this.bootID = bootID;
		this.data = data.join(";");
	}

	static fromByteStream(byteStream)
	{
		var bootSystemID = IsoFileString.fromBytes(byteStream.readBytes(32));
		var bootID = IsoFileString.fromBytes(byteStream.readBytes(32));
		var data = byteStream.readBytes(1977);
		var returnValue = new IsoFileVolumeDescriptor_BootRecord
		(
			bootSystemID, bootID, data
		);
		return returnValue;
	}
}
