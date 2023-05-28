
class IsoFileVolumeDescriptorType
{
	constructor(name, code, volumeDescriptorReadFromByteStream)
	{
		this.name = name;
		this.code = code;
		this.volumeDescriptorReadFromByteStream = volumeDescriptorReadFromByteStream;
	}

	static Instances()
	{
		if (IsoFileVolumeDescriptorType._instances == null)
		{
			IsoFileVolumeDescriptorType._instances =
				new IsoFileVolumeDescriptorType_Instances();
		}
		return IsoFileVolumeDescriptorType._instances;
	}

	// static methods

	static fromCode(code)
	{
		var codeEscaped = "_" + code;
		var instances = IsoFileVolumeDescriptorType.Instances()._All;
		var returnValue = instances[codeEscaped];
		return returnValue;
	}
}

class IsoFileVolumeDescriptorType_Instances
{
	constructor()
	{
		this.BootRecord = new IsoFileVolumeDescriptorType
		(
			"BootRecord", 
			0, // code
			IsoFileVolumeDescriptor_BootRecord.fromByteStream
		);
		 
		this.Primary = new IsoFileVolumeDescriptorType
		(
			"Primary", 
			1,
			IsoFileVolumeDescriptor_Primary.fromByteStream
		);
		 
		this.Supplemental = new IsoFileVolumeDescriptorType
		(
			"Supplemental", 
			2,
			function volumeDescriptorReadFromByteStream(byteStream)
			{
				byteStream.readBytes(2041); // todo
				return new IsoFileVolumeDescriptor_Supplemental();
			}		   
		);
		 
		this.Partition = new IsoFileVolumeDescriptorType
		(
			"Partition", 
			3,
			function volumeDescriptorReadFromByteStream(byteStream)
			{
				byteStream.readBytes(2041); // todo
				return new IsoFileVolumeDescriptor_Partition();
			}
		);

		this.Terminator = new IsoFileVolumeDescriptorType
		(
			"Terminator", 
			255,
			function volumeDescriptorReadFromByteStream(byteStream)
			{
				byteStream.readBytes(2041);
				return new IsoFileVolumeDescriptor_Terminator();
			}
		);

		this._All = 
		[
			this.BootRecord,
			this.Primary,
			this.Supplemental,
			this.Partition,
			this.Terminator
		];

		for (var i = 0; i < this._All.length; i++)
		{
			var element = this._All[i];
			var key = "_" + element.code;
			this._All[key] = element;
		}
	}
}
