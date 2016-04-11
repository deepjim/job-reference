/*

CSCI 3280, Introduction to Multimedia Systems
Spring 2016

Assignment 01 Skeleton
Name: Chim Wing Tat
Sid: 1155032378
inverse.cpp

*/

#include "stdio.h"
#include "stdlib.h"
#include "malloc.h"
#include "memory.h"
#include "math.h"
#include "bmp.h"		//	Simple .bmp library

#define MAX_SHADES 8


//
//	***** PUT ALL YOUR CODE INSIDE main() *****
//
int main(int argc, char** argv)
{

	char shades[MAX_SHADES] = { ' ', '.', '+', '*', 'X', '%', '#', '@' };
	int w, h, i = 0, j = 0, k;
	char buf;
	//	Open ASCII Art file ( command line: argv[1] )
	//
	FILE *fin = fopen(argv[1], "r");
	fscanf(fin, "%d %d", &w, &h);

	//	Create a Bitmap object accordingly
	Bitmap myBmp(w, h);

	getc(fin);// a '\n' in line 1

	for (i = 0; i <= h; i++) {
		for (j = 0; j <= w; j++) {
			buf = getc(fin);
			for (k = 1; k <= MAX_SHADES; k++) {
				if (buf == shades[k]) myBmp.setColor(j, i, k * 32, k * 32, k * 32);
			}
		}
	}

	//	Save Bitmap file ( command line: argv[2] )	
	myBmp.save(argv[2]);
	fclose(fin);
	//system("pause");
	return 0;

}
