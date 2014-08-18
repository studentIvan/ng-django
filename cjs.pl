my @n; my ($a0, $a1) = @ARGV; open I => "<$a0"; while (<I>) {
	s/\015?\012?$//; push @n => $_} close I; 
	$a0 =~ s/\/\w+$//; open A => ">$a1"; for my $w(@n) {
	my $q = substr $w => -1; if ($q eq '*') {
		$w =~ s/\/?\*$//; opendir(DIR, "./$a0/$w") || die("Не удалось открыть папку ./$a0/$w");
		my @jss = grep { /^\S+\.js$/i && -f "./$a0/$w/$_" } readdir DIR;
		rewinddir DIR; for my $j(@jss) {
			open E => "<./$a0/$w/$j"; my $b = do { local $/ ; <E>}; close E;
			print "файл $a0/$w/$j - ok\n"; print A $b, "\n";
		} closedir DIR; } else {
		open E => "<./$a0/$w"; my $b = do { local $/ ; <E>}; close E;
		print "файл $a0/$w - ok\n"; print A $b, "\n";
}} close A;