
class IsoFileVolumeDescriptor
{
	// static methods

	static fromByteStream(byteStream)
	{
		var typeAsByte = byteStream.readByte();
		var type = IsoFileVolumeDescriptorType.fromCode(typeAsByte);
		var identifier = byteStream.readBytes(5);
		var version = byteStream.readByte();

		var returnValue = type.volumeDescriptorReadFromByteStream
		(
			byteStream
		);

		return returnValue;
	}
}
