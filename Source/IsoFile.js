
class IsoFile
{
	constructor(systemAreaAsBytes, volumeDescriptors)
	{
		// Format specifications at http://wiki.osdev.org/Iso_9660.
		// Field assignments re-ordered for clearer serialization.

		this.volumeDescriptors = volumeDescriptors;

		var volumeDescriptorPrimary = this.volumeDescriptorPrimary();
		this.directoryRoot = volumeDescriptorPrimary.directoryEntryRoot.clone();

		this.systemAreaAsBytes = systemAreaAsBytes.join(";"); // Usually bootable assembly? 
	}

	// Static methods.

	static fromBinaryStrings(fileAsBinaryStrings)
	{
		var fileAsByteStream = new ByteStreamBinaryStrings
		(
			fileAsBinaryStrings
		);

		var systemAreaAsBytes = fileAsByteStream.readBytes(32768);

		var volumeDescriptors = [];
		var volumeDescriptorTypeTerminator = 
			IsoFileVolumeDescriptorType.Instances().Terminator;
		while (true)
		{
			var volumeDescriptor = IsoFileVolumeDescriptor.fromByteStream
			(
				fileAsByteStream
			);
			 
			volumeDescriptors.push(volumeDescriptor);
			 
			if (volumeDescriptor.type == volumeDescriptorTypeTerminator)
			{
				break;
			}
		}

		var returnValue = new IsoFile
		(
			systemAreaAsBytes,
			volumeDescriptors
		);

		returnValue.directoryTreeBuild(fileAsByteStream);

		return returnValue;
	}

	// Instance methods.

	directoryTreeBuild(fileAsByteStream)
	{
		this.directoryRoot.directoryContentsBuild(fileAsByteStream);
	}

	volumeDescriptorPrimary()
	{
		return this.volumeDescriptors[0]; // todo
	}
}
