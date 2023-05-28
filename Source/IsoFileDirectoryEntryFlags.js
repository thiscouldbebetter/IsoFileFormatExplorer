
class IsoFileDirectoryEntryFlags
{
	constructor
	(
		isHidden,
		isDirectory,
		isAssociatedFile, // ? 
		doesExtendedAttributeRecordHaveFormatInfo, // ?	
		doesExtendedAttributeRecordHavePermissions, // ?
		isNotFinalEntryInFile
	)
	{
		this.isHidden = isHidden;
		this.isDirectory = isDirectory;
		this.isAssociatedFile = isAssociatedFile;
		this.doesExtendedAttributeRecordHaveFormatInfo =
			doesExtendedAttributeRecordHaveFormatInfo;
		this.doesExtendedAttributeRecordHavePermissions =
			doesExtendedAttributeRecordHavePermissions;
		this.isNotFinalEntryInFile = isNotFinalEntryInFile;
	}

	static fromByte(flagsAsByte)
	{
		return new IsoFileDirectoryEntryFlags
		(
			((flagsAsByte >> 0) & 1) == 1,
			((flagsAsByte >> 1) & 1) == 1,
			((flagsAsByte >> 2) & 1) == 1,
			((flagsAsByte >> 3) & 1) == 1,
			((flagsAsByte >> 4) & 1) == 1,
			// Bits 5 and 6 reserved.
			((flagsAsByte >> 7) & 1) == 1
		);
	}
}
