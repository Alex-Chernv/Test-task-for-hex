# test-task-for-hex
This is my test task

So the start point is that we are working with a big unsigned integers of a byte length out of regular 4/8 bytes.
In fact, every input string produces a "big integer" with byte length equal to string resperentation length.
Byte sequences are treated as unsigned integers of little-endian (this is the same byte order as regular int's on most platforms) but a way larger in length.
Probably there is a Javascript library for this task.

Steps to calculate the hash:

1) Produce salt "big integer" bytes by using the pre-defined constant value - it is defined as a constant decimal string. Salt value is constant and can persist between hashing.
2) Produce two prime numbers (dividers) "big integers". They are constants too like salt.

3) Produce input "big integer" bytes by directly using bytes of the input string (in utf8, if there are not only latin characters).
4) Prepend salt bytes to input string bytes. As we are using little-endian, this means that salt bytes address in memory will be higher than input string bytes in the combined value.

-----------------------------------> memory addresses grow
123ABCD - input string bytes
EFGH - salt bytes
123ABCDEFGH - combined value

5) Divide the combined value by a pre-defined prime numbers. We are interested in remainder of division instead of quotient . We have two dividers so far we receive two another big integer values.
6) By definition, the remainders have not more than 8 bytes length because remainder of division cannot be higher than divisor, and divisors are defined for 8 bytes. If the length is less than 8 bytes, we treat higher bytes as zeros (as a regular integers of fixed length do in that case).
7) The final step is to build HEX strings from that hashes of 2x8 = 16 characters long.

There are 3 constants that are used in the alghorithm.
1) "Salt" big integer that is used to strengthen the hash - kQLHashSalt.
2) Two pre-defined prime numbers that act as a dividers to produce two different hashes - kQLHashDivizorsTable. We use two ones from the last row (two largest values). The first is for QID, the second is for HID.

The constants can be found in QLHashFunction.cpp at iOS/QLert/QLert/Source/GenSec/hash


static const char* kQLHashSalt = "61082669095548704068334695475925";

static const char* kQLHashDivizorsTable..... =
{ "18446744073709551533", "18446744073709551557" },
